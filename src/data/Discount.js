export const Discount = [
    {code: "SAVE50", category: "Coupon", value: 50, campaign: "Fixed Amount"},
    {code: "SAVE10%", category: "Coupon", value: 10, campaign: "Percentage discount"},
    {code: "ONTOP15%", category: "On top", value: 15, campaign: "Discount by category"},
    {code: "POINTS", category: "On top", value:1, maxPercent: 20, campaign: "Points discount"},
    {code: "EVERY300", category: "Seasonal", every: 300, value: 40, campaign: "Special campaigns"}
]

export function getDiscount(cartItems, code, customerPoints = 0) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    let rawCode = "";
    if (code != null) {
        rawCode = String(code);
    }
    const enteredCode = rawCode.trim();
    const rule = Discount.find((item) => item.code === enteredCode);

    if (!rule || subtotal <= 0) {
        return { subtotal, discount: 0, total: subtotal };
    }

    let discount = 0;

    if (rule.campaign === "Fixed Amount") {
        discount = rule.value;
    } else if (rule.campaign === "Percentage discount") {
        discount = Math.floor((subtotal * rule.value) / 100);
    } else if (rule.campaign === "Discount by category" && rule.itemCategory) {
        const categoryTotal = cartItems.reduce((sum, item) => {
            if (item.category === rule.itemCategory) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);
        discount = Math.floor((categoryTotal * rule.value) / 100);
    } else if (rule.campaign === "Points discount") {
        const points = Math.max(0, Math.floor(Number(customerPoints) || 0));
        const pointValue = points * rule.value;
        const maxDiscount = Math.floor(subtotal * (rule.maxPercent / 100));
        discount = Math.min(pointValue, maxDiscount);
    } else if (rule.campaign === "Special campaigns") {
        const times = Math.floor(subtotal / rule.every);
        discount = times * rule.value;
    }

    discount = Math.min(Math.max(0, discount), subtotal);

    return { subtotal, discount, total: subtotal - discount };
}

