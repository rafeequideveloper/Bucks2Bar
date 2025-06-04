// Unit tests for username validation regex used in main.js

// The regex from main.js:
const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

describe('Username Validation Regex', () => {
  it('should accept valid usernames', () => {
    expect(usernameRegex.test('Abcdef1!')).toBe(true);
    expect(usernameRegex.test('Password1@')).toBe(true);
    expect(usernameRegex.test('A1!aaaaa')).toBe(true);
    expect(usernameRegex.test('Z9#qwerty')).toBe(true);
  });

  it('should reject usernames shorter than 8 characters', () => {
    expect(usernameRegex.test('A1!aaaa')).toBe(false); // 7 chars
    expect(usernameRegex.test('A1!a')).toBe(false);    // 4 chars
  });

  it('should reject usernames without uppercase letters', () => {
    expect(usernameRegex.test('abcdef1!')).toBe(false);
    expect(usernameRegex.test('password1@')).toBe(false);
  });

  it('should reject usernames without numbers', () => {
    expect(usernameRegex.test('Abcdefgh!')).toBe(false);
    expect(usernameRegex.test('Password!')).toBe(false);
  });

  it('should reject usernames without special characters', () => {
    expect(usernameRegex.test('Abcdefg1')).toBe(false);
    expect(usernameRegex.test('Password1')).toBe(false);
  });

  it('should reject usernames missing multiple requirements', () => {
    expect(usernameRegex.test('abcdefgh')).toBe(false); // no uppercase, number, or special
    expect(usernameRegex.test('ABCDEFGH')).toBe(false); // no number or special
    expect(usernameRegex.test('12345678')).toBe(false); // no uppercase or special
    expect(usernameRegex.test('!@#$%^&*')).toBe(false); // no uppercase or number
  });
});