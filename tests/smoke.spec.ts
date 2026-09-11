import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("homepage loads with no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("menu route loads and shows items", async ({ page }) => {
    await page.goto("/menu");
    await expect(page.getByRole("heading", { name: "Ons volledige menu" })).toBeVisible();
    await expect(page.getByText("Kapsalon Kipdöner").first()).toBeVisible();
  });

  test("bestellen route loads", async ({ page }) => {
    await page.goto("/bestellen");
    await expect(page.getByRole("heading", { name: "Stel je bestelling samen" })).toBeVisible();
  });

  test("primary navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Menu" }).click();
    await expect(page).toHaveURL(/\/menu\/?$/);

    await page.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact\/?$/);

    await page.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Catering" }).click();
    await expect(page).toHaveURL(/\/catering\/?$/);
  });

  test("item can be added to cart and cart count changes", async ({ page }) => {
    await page.goto("/bestellen");
    await page.getByRole("button", { name: "Toevoegen" }).first().click();
    const dialogAdd = page.locator('[role="dialog"] button:has-text("Toevoegen")');
    await dialogAdd.click();
    await expect(page.getByText("toegevoegd aan je bestelling")).toBeVisible();
    await expect(page.getByRole("link", { name: /Bestelling · €/ }).first()).toBeVisible();
  });

  test("checkout can be reached and demo order reaches success page", async ({ page }) => {
    await page.goto("/bestellen");
    await page.getByRole("button", { name: "Toevoegen" }).first().click();
    await page.locator('[role="dialog"] button:has-text("Toevoegen")').click();
    await page.waitForTimeout(300);

    await page.goto("/checkout");
    await page.locator("#name").fill("Test Klant");
    await page.locator("#phone").fill("0612345678");
    await page.getByRole("button", { name: /Bestelling plaatsen/ }).click();
    await expect(page).toHaveURL(/\/bestelling\/gelukt/);
    await expect(page.getByRole("heading", { name: "Bestelling ontvangen" })).toBeVisible();
    await expect(page.getByText(/niet daadwerkelijk verzonden of betaald/)).toBeVisible();
  });

  test("payment methods are selectable and filtered by fulfillment", async ({ page }) => {
    await page.goto("/bestellen");
    await page.getByRole("button", { name: "Toevoegen" }).first().click();
    await page.locator('[role="dialog"] button:has-text("Toevoegen")').click();
    await page.waitForTimeout(300);
    await page.goto("/checkout");

    await expect(page.getByRole("radio")).toHaveCount(8);
    const paypal = page.getByRole("radio", { name: "PayPal" });
    await paypal.click();
    await expect(paypal).toHaveAttribute("aria-checked", "true");

    await page.getByRole("button", { name: "bezorgen" }).click();
    await expect(page.getByRole("radio", { name: /Pin bij afhalen/ })).toHaveCount(0);
    await expect(page.getByText(/Minimale bestelling voor bezorgen/)).toBeVisible();
    await expect(page.getByRole("button", { name: /Bestelling plaatsen/ })).toBeDisabled();
  });

  test("tip selection updates the total", async ({ page }) => {
    await page.goto("/bestellen");
    await page.getByRole("button", { name: "Toevoegen" }).first().click();
    await page.locator('[role="dialog"] button:has-text("Toevoegen")').click();
    await page.waitForTimeout(300);
    await page.goto("/checkout");

    const submitBefore = await page.getByRole("button", { name: /Bestelling plaatsen/ }).first().textContent();
    await page.getByRole("button", { name: "10%", exact: true }).click();
    const submitAfter = await page.getByRole("button", { name: /Bestelling plaatsen/ }).first().textContent();
    expect(submitAfter).not.toEqual(submitBefore);
  });

  test("order review Wijzigen link jumps back to a section", async ({ page }) => {
    await page.goto("/bestellen");
    await page.getByRole("button", { name: "Toevoegen" }).first().click();
    await page.locator('[role="dialog"] button:has-text("Toevoegen")').click();
    await page.waitForTimeout(300);
    await page.goto("/checkout");

    await page.getByRole("button", { name: "Wijzigen" }).first().click();
    await page.waitForTimeout(400);
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe("checkout-fulfillment");
  });

  test("order detail page shows status timeline and reorder restores cart", async ({ page }) => {
    await page.goto("/bestellen");
    await page.getByRole("button", { name: "Toevoegen" }).first().click();
    await page.locator('[role="dialog"] button:has-text("Toevoegen")').click();
    await page.waitForTimeout(300);
    await page.goto("/checkout");
    await page.locator("#name").fill("Test Klant");
    await page.locator("#phone").fill("0612345678");
    await page.getByRole("button", { name: /Bestelling plaatsen/ }).click();
    await expect(page).toHaveURL(/\/bestelling\/gelukt/);

    await page.getByRole("link", { name: /Bekijk bestelstatus/ }).click();
    await expect(page).toHaveURL(/\/bestelling\/order/);
    await expect(page.getByText("Bestelling ontvangen")).toBeVisible();
    await expect(page.getByRole("button", { name: "Opnieuw bestellen" })).toBeVisible();

    await page.getByRole("button", { name: "Opnieuw bestellen" }).click();
    await expect(page).toHaveURL(/\/bestellen/);
    await expect(page.getByRole("link", { name: /Bestelling · €/ }).first()).toBeVisible();
  });

  test("contact and catering routes load", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Kom langs of neem contact op" })).toBeVisible();

    await page.goto("/catering");
    await expect(page.getByRole("heading", { name: /Catering in Dordrecht/ })).toBeVisible();
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const response = await page.goto("/dit-bestaat-niet");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /pagina bestaat niet/i })).toBeVisible();
  });
});
