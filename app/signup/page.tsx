import { signup } from "@/app/lib/actions";

export default function Page() {

  return (
    <>
      <h1>Регистрация</h1>
      <form action={signup}
        className="flex flex-col items-start"
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
        />
        <label htmlFor="confirmPass">Confirm password</label>
        <input
          id="confirmPass"
          name="confirmPass"
          type="password"
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </>
  )
}