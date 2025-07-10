const {BloomFilter}=require('./bloom')

const bloom=new BloomFilter(1000,3);

bloom.add("jugal")
bloom.add("karan")
bloom.add("youtube")
bloom.add("youtubes")

console.log(bloom.alreadyExist("jugal"))
console.log(bloom.alreadyExist("karan"))
console.log(bloom.alreadyExist("youtube"))
console.log(bloom.alreadyExist("youtube"))
console.log(bloom.alreadyExist("youtubes"))
