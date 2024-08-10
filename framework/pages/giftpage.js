import { expect } from '@playwright/test'

import { url, email, password } from '../data';

export function GiftPage({ page }) {
    const visit = async () => {
        await page.goto(`product/new`)
    }

    const fillLinktToGift = async (link) => {
        await page.getByPlaceholder('Вставьте ссылку на подарок').fill(link);
    }


    const clickApplyButton = async () => {
        await page.getByRole('button', { name: 'Применить' }).click();
    }

    const clickUserMenuButton = async () => {
        await page.getByTestId('user-menu-button').click();
    }

    const clickAddGift = async () => {
        await page.getByRole('button', { name: 'Добавить подарок' }).click();
    }

    const clickLastWishlistCheckbox = async () => {
        await page.getByTestId('check-item-checkbox').last().locator('label').click();
    }
    
    const clickFillManualButton = async () => {
        await page.getByRole('button', { name: 'Заполнить вручную' }).click();
    }
    
    const clickMenuButton = async ()  => {
        await page.getByRole('button').first().click();
    }

    const clickMenuEdit = async () => {
        await page.getByText('Редактировать').click();   
    }

    const clickGiftName = async () => {
        await page.getByPlaceholder('Название подарка').click();
    }

    const clickGiftPrice = async () => {
        await page.getByPlaceholder('Цена').click();
    }
    const clickSaveGiftButton = async () => {
        await page.getByRole('button', { name: 'Сохранить' }).click();
    }

    const clickNewListButton = async () => {
        await page.getByText('Создать новый список').nth(1).click();
    }

    const fillListName = async () => {
        await page.getByPlaceholder('Название списка').fill('Пупсик');
    } 

    const clicklistCheckbox = async (name) => {
        await page.getByRole('main').getByRole('list').locator('li').filter({ hasText: name }).first().locator('svg').click();
    }
    
    const clickMyGifts = async () => {
        await page.getByRole('link', { name: 'Мои подарки' }).click();
    }

    const clickGiftImage = async (name) => {
        await page.getByRole('img', { name }).first().click();
    }

    const clickAddComment = async () => {
        await page.getByText('Добавить комментарий').click();
    }
    
    const clickCommentText = async (name) => {
            await page.getByPlaceholder('Текст комментария').fill(name);
    }

    const clickSaveComment = async () => {
        await page.getByRole('button', { name: 'Сохранить' }).click();
    }

    const clickMenuDelete = async () => {
        await page.getByText('Удалить', { exact: true }).click();
    }

    const clickAddGiftCard = async () => {
         await page.locator('[data-name=btn-add-present]').first().click()
    }
    return {
        visit,
        fillLinktToGift,
        clickApplyButton,
        clickUserMenuButton,
        clickAddGift,
        clickLastWishlistCheckbox,
        clickFillManualButton,
        clickMenuButton,
        clickMenuEdit,
        clickGiftName,
        clickGiftPrice,
        clickSaveGiftButton,
        clickNewListButton,
        fillListName,
        clicklistCheckbox,
        clickMyGifts,
        clickGiftImage,
        clickAddComment,
        clickCommentText,
        clickSaveComment,
        clickMenuDelete,
        clickAddGiftCard,


        
    }
}