import notFound from '../images/notFound.png';
export default function NotFound() {
  return (
    <div className="not-found">
      <img className="not-found__img" src={notFound} alt = "Не найдено" />
      <h1 className="not-found__h1">Ошибка в адресной строке</h1>
      <p className="not-found__p">Вы, наверное, ввели несуществующий адрес страницы</p>
    </div>
  );
}