var decompressRLElist = function(nums) {
    let arr=[];
    k=0;
    for(let i=0;i<nums.length;i+=2){
        freq=nums[i];
        val=i+1;
        for(let j=0;j<freq;j++){
            arr.push(nums[val]);
        }

    }
    return arr
};
a=[1,1,2,3]
console.log(decompressRLElist(a));