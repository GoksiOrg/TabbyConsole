export default function validateInput(input: HTMLInputElement, rule: (value: string) => boolean): boolean {
    let value = input.value;
    if (!value || !rule(value)) {
        input.classList.add("is-invalid");
        return false;
    }
    return true;
}
