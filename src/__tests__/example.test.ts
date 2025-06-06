describe('Example Test Suite', () => {
    test('should pass a basic test', () => {
        expect(1 + 1).toBe(2);
    });

    test('should handle string operations', () => {
        const greeting = 'Hello World';
        expect(greeting).toContain('Hello');
        expect(greeting.length).toBe(11);
    });

    test('should work with arrays', () => {
        const numbers = [1, 2, 3, 4, 5];
        expect(numbers).toHaveLength(5);
        expect(numbers).toContain(3);
    });
});
