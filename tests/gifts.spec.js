// @ts-check
const { test, expect } = require('@playwright/test');

import { GiftPage } from '../framework/pages/giftpage';
import { HomePage } from '../framework/pages/homepage';

test('Добавить подарок на главной странице сайта', async ({ page }) => {
  test.slow();

  const homePage = HomePage({ page });
  const giftPage = GiftPage({ page });

  await homePage.login();
  await homePage.clickAddGift();
  await giftPage.fillLinktToGift('https://ozon.ru/t/plWnXGK');
  await giftPage.clickApplyButton();

  await giftPage.clickLastWishlistCheckbox();
  await giftPage.clickAddGift();
  await expect(page.getByRole('heading', { name: 'Подарок добавлен' })).toBeVisible();
});

test('Добавить подарок с ошибкой парсинга', async ({ page }) => {
  test.slow();

  const homePage = HomePage({ page });
  const giftPage = GiftPage({ page });

  await homePage.login();
  await homePage.clickAddGift();
  await giftPage.fillLinktToGift('https://opon.ru/t/12227');
  await giftPage.clickApplyButton();

  await expect(page.getByTestId('product-loading-percent')).toBeVisible();
  await expect(page.getByText('Не удалось получить данные о товаре')).toBeVisible({ timeout: 60000 });

  await giftPage.clickFillManualButton();
  await expect(page.getByRole('heading', { name: 'Добавить подарок' })).toBeVisible();
});

test('Редактирование подарка после добавления', async ({ page }) => {
  
  test.slow();

  const homePage = HomePage({ page });
  const giftPage = GiftPage({ page });

  await homePage.login();

  await homePage.clickUserAvatar();
  await homePage.clickAddGift();
  await giftPage.fillLinktToGift('https://ozon.ru/t/plWnXGK');
  await giftPage.clickApplyButton();
  await giftPage.clickLastWishlistCheckbox();
  await giftPage.clickAddGift();

  await expect(page.getByRole('heading', { name: 'Подарок добавлен' })).toBeVisible();
  await giftPage.clickMenuButton();
  await giftPage.clickMenuEdit();

  await expect(page.getByRole('heading', { name: 'Редактирование подарка' })).toBeVisible();
  await giftPage.clickGiftName();
  await page.getByPlaceholder('Название подарка').fill('Поя MATEX, 48x48');
  await giftPage.clickGiftPrice();
  await page.getByPlaceholder('Цена').fill('590 0000 ₽');

  await giftPage.clickSaveGiftButton();
  await expect(page.getByRole('heading', { name: 'Подарок добавлен' })).toBeVisible();
});


test('Добавление подарка с созданием списка', async ({ page }) => {
  test.slow();

  const homePage = HomePage({ page });
  const giftPage = GiftPage({ page });

  await homePage.login();

  await homePage.clickAddGift();
  await giftPage.fillLinktToGift('https://ozon.ru/t/plWnXGK');
 
  await giftPage.clickApplyButton();
  await giftPage.clickNewListButton();

  await giftPage.fillListName();
  await giftPage.clickSaveGiftButton();
  await giftPage.clicklistCheckbox(/^Пупсик$/);
  await giftPage.clickAddGift();
  await expect(page.getByRole('heading', { name: 'Подарок добавлен' })).toBeVisible();

  /*await page.getByText('Вишлисты', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^РедактироватьУдалитьПупсикПодарков: 1‌$/ }).getByRole('button').click();
  await page.getByText('Удалить').first().click();
  await page.getByRole('button', { name: 'Да, удалить' }).click();
  await expect(page.getByText('Пупсик')).not.toBeVisible();*/
});


test('Добавить комментарий к карточке подарка', async ({ page }) => {
  
  test.slow();

  const homePage = HomePage({ page });
  const giftPage = GiftPage({ page });

  await homePage.login();

  await homePage.clickAddGift();
  await giftPage.fillLinktToGift('https://ozon.ru/t/plWnXGK');
  await giftPage.clickApplyButton();
  await giftPage.clickLastWishlistCheckbox();

  await giftPage.clickAddGift();
  await expect(page.getByRole('heading', { name: 'Подарок добавлен' })).toBeVisible();

  await giftPage.clickMyGifts();
  await giftPage.clickGiftImage('Подаркус-Подушка декоративная MATEX, 48x48');
  await giftPage.clickAddComment();
  await giftPage.clickCommentText('ТЕСТ12,,😁');
  await giftPage.clickSaveComment();

  await expect(page.getByText('ТЕСТ12,,😁')).toBeVisible();
});


test('Удалить подарок при просмотре карточке', async ({ page }) => {

  const homePage = HomePage({ page });
  const giftPage = GiftPage({ page });

  await homePage.login();
  await homePage.clickUserAvatar();

  await giftPage.clickAddGiftCard();

  await giftPage.fillLinktToGift('https://ozon.ru/t/plWnXGK');
  
  await giftPage.clickApplyButton();
  await page.getByPlaceholder('Название подарка').fill('Подушка внутренняя декоративная Швейный Дом ВП4545-1, 45х45 см белая😁😁');
  await giftPage.clickLastWishlistCheckbox();
  await giftPage.clickAddGift();

  await expect(page.getByRole('heading', { name: 'Подарок добавлен' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Подушка внутренняя декоративная Швейный Дом ВП4545-1, 45х45 см белая' })).toBeVisible();

  await giftPage.clickMenuButton();
  await giftPage.clickMenuDelete();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Да, удалить' }).click();
  await page.waitForTimeout(3000);

  await expect(page.getByText('Подушка внутренняя декоративная')).not.toBeVisible();
});











