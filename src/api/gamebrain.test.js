import { normalizeGame, safeUrl } from "./gamebrain";
import { buildGamesPath } from "./games";

test("normalizes provider IDs, ratings and playable media without inventing missing data", () => {
  const game = normalizeGame({ id: 15174, name: "Portal 2", rating: { mean: 0.96 }, year: 2011, platforms: [{ value: "pc", name: "PC" }], videos: ["https://www.youtube-nocookie.com/embed/A0K5EXfgJnk", "https://example.com/trailer.mpd"], screenshots: ["https://example.com/shot.jpg", "javascript:alert(1)"] });
  expect(game.id).toBe("gb-15174");
  expect(game.rating).toBe(4.8);
  expect(game.released).toBe("2011");
  expect(game.platforms[0].platform.name).toBe("PC");
  expect(game.videos).toHaveLength(1);
  expect(game.videos[0].embed).toBe(true);
  expect(game.screenshots).toHaveLength(1);
  expect(game).not.toHaveProperty("metacritic");
  expect(safeUrl("javascript:alert(1)")).toBe("");
});

test("combines search, pagination and supported filters", () => {
  const url = new URL(buildGamesPath(2, "Portal", "-rating", { genres: ["action"], platforms: ["pc"], tags: ["play_mode:co_op"], period: "last_year" }), "https://example.com");
  expect(url.searchParams.get("offset")).toBe("20");
  expect(url.searchParams.get("query")).toBe("Portal");
  expect(url.searchParams.get("sort")).toBe("computed_rating");
  expect(JSON.parse(url.searchParams.get("filters"))).toEqual(expect.arrayContaining([{ key: "play_mode", values: [{ value: "co_op" }], connection: "AND" }]));
  expect(new URL(buildGamesPath(999), "https://example.com").searchParams.get("offset")).toBe("1000");
});
