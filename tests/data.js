export const url = 'https://podarkus.ru';
const email = 'lkudryakovf@mail.ru';
const password = '21ipivef';

export const login = async (page) => {
    await page.goto(url);
    await page.getByText('Войти').click();
    await page.getByPlaceholder('Электронная почта').click();
    await page.getByPlaceholder('Электронная почта').fill(email);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(password);
    await page.getByRole('button', { name: 'Войти' }).click();
};
