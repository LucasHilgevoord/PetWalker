function getRandomNumber(min, max) {
  var random = Math.random();
  var randomNumberInRange = Math.floor(random * (max - min + 1)) + min;
  return randomNumberInRange;
}