// import { toast } from "react-toastify";
import CustomLink from "./ui/CustomLink";

export default function Home() {
  // const notify = () => toast('Wow so easy!')

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <p className="text-9xl mt-40 mb-20 text-center">SIMPLE BLOG</p>
      {/* <button onClick={notify}>Notify</button> */}
      <CustomLink href="/blog">Читать</CustomLink>
    </div>
  );
}

// Создать навбар (навбар содержит лого слева и рег/войти справа, если нет пользователя)
// Где расположен навбар? В РУТЛЭЙАУТЕ или в блоглэйауте?
// Допустим в РУТ, тогда на страницах login/signup навбар не должен появляться
// Допустим в БЛОГ, тогда не надо писать доп. правил, но на главной странице навбар будет не доступен

// Централизовать страницу с постами
// Написать description к постам (взять первые 30 символов из основной статьи)

// Логинизация делает запрос к бд через postgresql и возвращает либо пользоавтеля, либо ошибку БД, либо ошибку поиска пользователя
// После успешной регистрации идет логинизация(метод signin)

// Создать action для создания постов, отправляется title и body, возвращается либо ошибка, либо toast status ok после отправки в БД
// То же самое для редактирования постов

// Страницы create, edit отправляют на логин невошедших пользователей
// Страница login должна иметь ссылку на signup и наоборот
// Как можно сделать? Через middleware или через user.session!
// Сначала через user.session