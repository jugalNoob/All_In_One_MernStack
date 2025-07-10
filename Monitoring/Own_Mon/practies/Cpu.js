// const os = require('node:os');

const os= require('node:os')

function monitor(){
    const oldCpus=os.cpus()
    // console.log(oldCpus)



    setTimeout(()=>{

        const newCpus=os.cpus()

        const usage=newCpus.map((cpu , i)=>{

            return{
                core:i,
                usage:calculateCPU(oldCpus[i] , newCpus[i] ) + '%',
            }
        })

        console.clear()
        console.table(usage)

    } , 1000)

}

function calculateCPU(oldCPU , newCPU){

    const oldTotal=Object.values(oldCPU.times).reduce((a,b)=>
    a+b)

    const newtotal=Object.values(newCPU.times).reduce((a,b)=>
        a+b)

    const idle=newCPU.times.idle - oldCPU.times.idle


    const total=newtotal - oldTotal;

    const used=total-idle;

    return ((100 * used) / total).toFixed(1)
}

setInterval(monitor,1000)