import { expect } from '@playwright/test'

import { url, email, password } from '../data';

export function HomePage({ page }) {
    const visit = async () => {
        await page.goto(`/editor/`)
        await expect(page.locator('h1')).toHaveText('Sign up')
    }

    const clickAboutService = async () => {
        await page.getByRole('link', { name: 'О сервисе' }).click();
    }

    const login = async () => {
        await page.goto(url);
        await page.getByText('Войти').click();
        await page.getByPlaceholder('Электронная почта').click();
        await page.getByPlaceholder('Электронная почта').fill(email);
        await page.getByPlaceholder('Пароль').click();
        await page.getByPlaceholder('Пароль').fill(password);
        await page.getByRole('button', { name: 'Войти' }).click();
    };

    const clickTarifs = async () => {
        await page.getByRole('link', { name: 'Тарифы' }).click();
    }

    const clickUserMenuButton = async () => {
        await page.getByTestId('user-menu-button').click();
    }

    const clickUserAvatar = async () => {
        await page.locator('a[href^="/user/"]').click();
    }

    const clickPudarkusLogo = async () => {
        await page.getByTestId('pudarkus-logo').click();
    }
    
    const clickSearch = async () => {
        await page.getByRole('textbox', { name: 'Поиск' }).click();
    }
    
    const clickAddGift = async ()  => {
    await page.getByRole('link', { name: 'Добавить подарок' }).click();
    }

    

    return {
        login,
        visit,
        clickAboutService,
        clickTarifs,
        clickUserMenuButton,
        clickUserAvatar,
        clickPudarkusLogo,
        clickSearch,
        clickAddGift,
        
    }
}