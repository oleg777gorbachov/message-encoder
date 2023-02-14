function generateCode(length: number): string {
  const res: string[] = [];
  for (let i = 0; i < length; i++) {
    res.push(String.fromCharCode(Math.round(Math.random() * 25) + 65));
  }
  return res.join("");
}

export default generateCode;
