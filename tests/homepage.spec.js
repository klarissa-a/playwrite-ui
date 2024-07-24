// @ts-check
const { test, expect } = require('@playwright/test');

import { HomePage } from '../framework/pages/homepage';

  test('О сервисе', async ({ page }) => {
    const homePage = HomePage({ page })

    await homePage.login();
    await homePage.clickAboutService();
    
    await expect(page.getByRole('heading', { name: 'Сервис вишлистов «Подаркус»' })).toBeVisible();
  });
  test('Тарифы', async ({ page }) => {
    const homePage = HomePage({ page })

    await homePage.login();
    await homePage.clickTarifs();
    
    await expect(page.getByRole('heading', { name: 'Тарифы и цены' })).toBeVisible();
  });

  test('Меню пользователя', async ({ page }) => {
    const homePage = HomePage({ page })

    await homePage.login();
    await homePage.clickUserMenuButton();
    
    await expect(page.getByRole('link', { name: 'Мои подарки' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Вишлисты' })).toBeVisible();
    await expect(page.getByText('Друзья', { exact: true })).toBeVisible();
    await expect(page.getByText('Подарки друзьям', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Моя свадьба' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Календарь событий' })).toBeVisible();
    await expect(page.getByText('Архив')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Настройки' })).toBeVisible();
    await expect(page.getByText('Выйти', { exact: true })).toBeVisible();
  });

  test('Клик на аватар пользователя', async ({ page }) => {
    const homePage = HomePage({ page })

    await homePage.login();
    await homePage.clickUserAvatar();

    await expect(page.getByRole('link', { name: 'Мои подарки' })).toBeVisible({ timeout: 10000 });
    
    // лого подаркус
    await homePage.clickPudarkusLogo();
    await expect(page.getByText('Лента')).toBeVisible();
  });

  test('Клик в поиск на главной странице', async ({ page }) => {
    const homePage = HomePage({ page })

    await homePage.login();
    await homePage.clickSearch();
    
    await expect(page.getByRole('img', { name: 'reset' })).toBeVisible();
});

  