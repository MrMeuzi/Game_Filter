import { StrictMode } from "react";
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';

const portal = { id: 15174, name: "Portal 2", year: 2011, genre: "Platformer", image: "https://example.com/portal.jpg", rating: { mean: 0.96 } };
const details = { ...portal, release_date: "2011-04-18", developer: "Valve", description: "Solve puzzles together.", platforms: [{ value: "pc", name: "PC" }], genres: [{ value: "platformer", name: "Platformer" }], play_modes: [{ value: "co_op", name: "Co-Op" }], screenshots: ["https://example.com/screenshot.jpg"], videos: ["https://www.youtube-nocookie.com/embed/A0K5EXfgJnk"] };

beforeAll(() => {
  window.scrollTo = jest.fn();
  AbortSignal.timeout = jest.fn(() => undefined);
});
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.location.hash = '#/';
  global.fetch = jest.fn(async url => ({ ok: true, json: async () => String(url).includes('/games/15174') ? details : { total_results: 45, results: [portal] } }));
});

test('search, filters, pagination, media and favorites work through the proxy', async () => {
  const view = render(<StrictMode><App /></StrictMode>);
  expect(await screen.findByText('Portal 2')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const search = screen.getByPlaceholderText('Найти на Game_Filter');
  fireEvent.change(search, { target: { value: 'Portal' } });
  fireEvent.submit(search.closest('form'));
  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('query=Portal'), expect.anything()));
  fireEvent.click(screen.getByLabelText('Открыть фильтры'));
  const dialog = screen.getByRole('dialog');
  fireEvent.click(within(dialog).getByLabelText('Co-Op'));
  fireEvent.click(within(dialog).getByText('Искать'));
  await waitFor(() => expect(global.fetch.mock.calls.some(([url]) => decodeURIComponent(url).includes('co_op'))).toBe(true));
  expect(await screen.findByText('Portal 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('3', { selector: 'li' }));
  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('offset=40'), expect.anything()));
  expect(await screen.findByText('Portal 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Portal 2'));
  expect(await screen.findByText('Solve puzzles together.')).toBeInTheDocument();
  expect(screen.getByTitle('Видео 1')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('Скриншот из игры Portal 2'));
  expect(screen.getByAltText('Текущий скриншот')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Добавить в избранное'));
  await waitFor(() => expect(JSON.parse(localStorage.getItem('favorites'))['gb-15174'].tags).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Co-Op' })])));
  fireEvent.click(document.querySelector('a[href="#/favorites"]'));
  expect(await screen.findByText('Portal 2')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Открыть фильтры'));
  fireEvent.click(within(screen.getByRole('dialog')).getByLabelText('Co-Op'));
  fireEvent.click(within(screen.getByRole('dialog')).getByText('Искать'));
  expect(screen.getByText('Portal 2')).toBeInTheDocument();
  view.unmount();
  render(<App />);
  expect(await screen.findByText('Portal 2')).toBeInTheDocument();
  fireEvent.click(screen.getByAltText('Убрать из избранного'));
  expect(await screen.findByText('Вы не добавили ещё ни одной игры в избранное')).toBeInTheDocument();
});

test('a failed search displays a retry instead of an endless loading state', async () => {
  window.location.hash = '#/?search=network-error';
  global.fetch.mockImplementation(async () => ({ ok: false, status: 429, json: async () => ({ error: 'limit' }) }));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Лимит GameBrain');
  global.fetch.mockImplementation(async () => ({ ok: true, json: async () => ({ total_results: 1, results: [{ ...portal, name: 'Recovered game' }] }) }));
  fireEvent.click(screen.getByText('Повторить'));
  expect(await screen.findByText('Recovered game')).toBeInTheDocument();
});

test('legacy favorites never send a RAWG ID to GameBrain', async () => {
  localStorage.setItem('favorites', JSON.stringify({ 4200: { id: 4200, title: 'Old Portal 2', genres: [], platforms: [] } }));
  window.location.hash = '#/game/4200';
  render(<App />);
  expect(screen.getByText('Old Portal 2')).toBeInTheDocument();
  expect(screen.getByText('Найти в GameBrain').getAttribute('href')).toContain('Old%20Portal%202');
  expect(global.fetch).not.toHaveBeenCalled();
});
