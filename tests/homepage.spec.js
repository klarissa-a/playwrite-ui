// @ts-check
const { test, expect } = require('@playwright/test');

import { url, login } from './data';

  test('О сервисе', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'О сервисе' }).click();
    await expect(page.getByRole('heading', { name: 'Сервис вишлистов «Подаркус»' })).toBeVisible();
  });
  test('Тарифы', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Тарифы' }).click();
    await expect(page.getByRole('heading', { name: 'Тарифы и цены' })).toBeVisible();
  });

  test('Меню пользователя', async ({ page }) => {
    await login(page);
    
    await page.getByTestId('user-menu-button').click();
    
    await expect(page.getByRole('link', { name: 'Мои подарки' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Вишлисты' })).toBeVisible();
    await expect(page.getByText('Друзья', { exact: true })).toBeVisible();
    // падает на шаге друзья
    await expect(page.getByText('Подарки друзьям', { exact: true })).toBeVisible();
    //await expect(page.getByRole('link', { name: 'Моя свадьба' })).toBeVisible();//
    await expect(page.getByRole('link', { name: 'Календарь событий' })).toBeVisible();
    await expect(page.getByText('Архив')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Настройки' })).toBeVisible();
    await expect(page.getByText('Выйти', { exact: true })).toBeVisible();
  });

  test('Клик на аватар пользователя', async ({ page }) => {
    await login(page);

    await page.locator('a[href^="/user/"]').click();
    await expect(page.getByRole('link', { name: 'Мои подарки' })).toBeVisible({ timeout: 10000 });
    
    // лого подаркус
   await page.getByTestId('pudarkus-logo').click();
   await expect(page.getByText('Лента')).toBeVisible();
  });

  test('Клик в поиск на главной странице', async ({ page }) => {
    await login(page);
    await page.getByRole('textbox', { name: 'Поиск' }).click();
    await expect(page.getByRole('img', { name: 'reset' })).toBeVisible();
});

  test('Нажать "Подарки"', async ({ page }) => {
    await login(page);
    await page.locator('div').filter({ hasText: /^Подарки$/ }).getByAltText('arrow').click();
    await expect(page.getByRole('link', { name: 'Мои подарки' })).toBeVisible();
  });

  test('Нажать "Вишлисты"', async ({ page }) => {
    await login(page); 
    await page.goto(url + '/#feed');

    await page.getByText('Вишлисты', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Вишлисты' })).toBeVisible({ timeout: 15000 });
  });

  test('Обработка персональных данных,Пользовательское соглашение, Рекламодателям и партнерам', async ({ page }) => {
    await login(page);

    await page.getByText('Магазины').click();
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Обработка персональных данных' }).click();
    const page2 = await page2Promise;

    await page2.getByRole('heading', { name: 'Политика конфиденциальности ООО «Подаркус»' }).click();

    await expect(page2.getByText('Общие положения')).toBeVisible();

    await page2.locator('header').filter({ hasText: 'ВернутьсяООО «Подаркус»' }).locator('span').click();

    await expect(page2.getByText('Магазины')).toBeVisible();

    const page3Promise = page2.waitForEvent('popup');

    await page2.getByRole('link', { name: 'Пользовательское соглашение' }).click();

    const page3 = await page3Promise;


    await expect(page3.getByText('ООО «Подаркус»', { exact: true })).toBeVisible();

    await expect(page3.getByRole('heading', { name: 'Пользовательское соглашение' })).toBeVisible();
    await page3.locator('header').filter({ hasText: 'ВернутьсяООО «Подаркус»' }).locator('span').click();

    await expect(page3.getByText('Магазины')).toBeVisible();
  });
  
  test('Кнопка добавить подарок на главной странице сайта', async ({ page }) => {
    await login(page);

    await page.getByRole('link', { name: 'Добавить подарок' }).click();

    await expect(page.getByPlaceholder('Вставьте ссылку на подарок')).toBeVisible({ timeout: 15000 });
  });

  test('Открыть раздел "Календарь событиий"', async ({ page }) => {
    await login(page);
    await page.locator('.style_userActions__dropdownTrigger__bEmPe').click();
    await page.getByRole('link', { name: 'Календарь событий' }).click();
    await expect(page.getByText('Месяц')).toBeVisible();
    await expect(page.getByText('Год')).toBeVisible();


  });


  






















