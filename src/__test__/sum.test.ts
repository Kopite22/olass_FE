describe('sum', () => {
  it('should return the sum of two numbers', () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });

  it('should return the sum of three numbers', () => {
    const sum = (a: number, b: number, c: number) => a + b + c;
    expect(sum(1, 2, 3)).toBe(6);
  });
});
