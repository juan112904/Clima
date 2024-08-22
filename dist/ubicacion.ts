let latitud:number=0
let longitud:number=0
const formulario=document.getElementById('buscador') as form //No sé ´por qué no se puede hacer de la forma convencional
let body:HTMLBodyElement=document.querySelector('body')!
function ubicacion(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            latitud=position.coords.latitude
            longitud=position.coords.longitude
            const ubi =new Weather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}`)
            ubi.llamar()
            console.log('latitud '+latitud)
            console.log( 'longitud '+longitud)
        });
    }
}
ubicacion()

interface form extends HTMLFormElement{
    nombre:HTMLInputElement //No se puede poner string ya que este no tiene la propiedad .value
}


interface endpoint{ //Definimos el formato de los datos que vamos a recibir
    name:string,
    clouds:{
        all:number
    }
    main:{
        temp:number
        feels_like:number
        humidity:number
    }
    sys:{
        sunrise:number
        sunset:number
    }
    coords:{
        lon:number
        lat:number
    }
    weather:{
        0:{
            main:string
            description:string
            icon:string
        }
        
    }
    wind:{
        speed:number
    }
}

interface prediccion{
    list:endpoint[]
}

class Weather{
    private apiKey:string=`780d6ef3e765951bffec8faf23664f26`;
    private endpoint:string;
    private metodo?:number;
    private posicion:number;

    constructor(endpoint:string,metodo?:number,posicion:number=0){
        this.endpoint=endpoint+`&appid=${this.apiKey}&units=metric`
        this.metodo=metodo
        this.posicion=posicion
    }

    publicar(datos:endpoint){
        //Para seleccionar un elemnto del DOM, debemos al final poner ! lo cual significa que esa expresion no será nula
        let ciudad:HTMLElement=document.getElementById('nombreCiudad')!
        let temperatura:HTMLElement=document.getElementById('temperatura')!
        let descripcion:HTMLElement=document.getElementById('descripcion')!
        let icon:HTMLElement=document.getElementById('icon')!

        let sensacion:HTMLElement=document.getElementById('sensacion')!
        let viento:HTMLElement=document.getElementById('viento')!
        let humedad:HTMLElement=document.getElementById('humedad')!
        let sunset:HTMLElement=document.getElementById('sunset')!
        let nubes:HTMLElement=document.getElementById('nubes')!

        let conversorSunset:number=datos.sys.sunset*1000
        const horaSunset=new Date(conversorSunset)

        temperatura.innerText=`${datos.main.temp}°`
        ciudad.innerText=`${datos.name}`
        descripcion.innerText=`${datos.weather[0].description}`
        icon.setAttribute('src',`http://openweathermap.org/img/w/${datos.weather[0].icon}.png`)
        sensacion.innerText=`${datos.main.feels_like}`
        viento.innerText=`${datos.wind.speed}`
        humedad.innerText=`${datos.main.humidity}`
        sunset.innerText=`${horaSunset.getHours()}:${horaSunset.getMinutes()}`
        nubes.innerText=`${datos.clouds.all}`

        
        console.log('principal '+datos.weather[0].main)
        if(datos.weather[0].main=='Clear'){
            // body.classList.add('clear')
            body.setAttribute('class','text-white clear')
            crearLluvia(1)
            crearNieve(1)

        }else if(datos.weather[0].main=='Clouds'){
            // body.style.backgroundColor='red'
            body.setAttribute('class','text-white clouds')
            crearLluvia(1)
            crearNieve(1)

        }
        else if(datos.weather[0].main=='Snow' || datos.weather[0].main=='Drizzle'){
            // body.style.backgroundColor='red'
            body.setAttribute('class','text-white')
            crearLluvia(1)
            crearNieve()
        }
        else if(datos.weather[0].main=='Rain'){
            // body.style.backgroundColor='red'
            body.setAttribute('class','text-white clouds')
            lluvia.classList.remove('d-none')
            crearNieve(1)
            crearLluvia()
        }

        
    }
    principales(datos:endpoint,x:number){
        let ciudad:NodeListOf<HTMLElement>=document.querySelectorAll('.ciudadesPrincipales')
        let temperaturas:NodeListOf<HTMLElement>=document.querySelectorAll('.tempCiudades')

        ciudad[x].innerText=`${datos.name}`
        temperaturas[x].innerText=`${datos.main.temp}°`
        console.log('temperatura de las principales: '+datos.main.temp)
    }

    predicciones(datos:prediccion){
        let temperaturas:NodeListOf<HTMLElement>=document.querySelectorAll('.tempPrediccion')
        console.log('24 horas después '+ datos.list[7].main.temp)
        let promedio:number=Number(((datos.list[5].main.temp+datos.list[7].main.temp+datos.list[9].main.temp)/3).toFixed(2))
        let promedioPasado:number=Number(((datos.list[13].main.temp+datos.list[15].main.temp+datos.list[17].main.temp)/3).toFixed(2))
        let promedioProx:number=Number(((datos.list[21].main.temp+datos.list[23].main.temp+datos.list[25].main.temp)/3).toFixed(2))
        temperaturas[0].innerText=`${datos.list[0].main.temp}°`
        temperaturas[1].innerText=`${promedio}°`
        temperaturas[2].innerText=`${promedioPasado}°`
        temperaturas[3].innerText=`${promedioProx}°`

        console.log('promedionde mañana: '+promedio)
        console.log('48 horas después '+ datos.list[15].main.temp)
        console.log('72 horas después '+ datos.list[23].main.temp)

    }

    llamar(){
        fetch(this.endpoint)
            .then((respuesta)=>{
                let promesa= respuesta.json()
                if(this.metodo==2){
                    promesa.then((datos:prediccion)=>{
                        this.predicciones(datos)
                        // console.log(datos.list)
                        // console.log('en 24 horas: '+datos.list[7].main.temp)
                        // console.log('en 48 horas: '+datos.list[15].main.temp)
                        // console.log('en 72 horas: '+datos.list[23].main.temp)


                    }).catch((error)=>{
                        console.log(error)
                    })

                }else{

                
                promesa
                    .then((datos:endpoint)=>{
                        console.log('La temperaura es de: '+datos.main.temp)
                        console.log(datos)
                        if(this.metodo==1){
                            this.principales(datos,this.posicion)
                        }else{
                            this.publicar(datos)
                        }
                        
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }    
}



// const apiKey:string = '780d6ef3e765951bffec8faf23664f26';
// let url:string = `https://api.openweathermap.org/data/2.5/weather?q=Bogota`; //Buscar por ciudad
// url=`https://api.openweathermap.org/data/2.5/weather?lat=4.4401833&lon=-75.2128882` //Ubicacion actual
// url=`https://api.openweathermap.org/data/2.5/forecast?lat=4.4401833&lon=-75.2128882` //pronósticso

const ciudad= new Weather(`https://api.openweathermap.org/data/2.5/weather?q=Nueva York`,1,0)
ciudad.llamar()
const ciudad2= new Weather(`https://api.openweathermap.org/data/2.5/weather?q=Paris`,1,1)
ciudad2.llamar()
const ciudad3= new Weather(`https://api.openweathermap.org/data/2.5/weather?q=Madrid`,1,2)
ciudad3.llamar()
const ciudad4= new Weather(`https://api.openweathermap.org/data/2.5/weather?q=Miami`,1,3)
ciudad4.llamar()


// const ubi =new Weather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}}&lon=${longitud}`)
// ubi.llamar()
const pronos=new Weather(`https://api.openweathermap.org/data/2.5/forecast?lat=4.4401833&lon=-75.2128882`,2)
pronos.llamar()

const buscar=formulario?.addEventListener('submit',(e)=>{
    e.preventDefault()
    let busqueda=new Weather(`https://api.openweathermap.org/data/2.5/weather?q=${formulario.nombre.value}`)
    busqueda.llamar()
    let pronosBusqueda=new Weather(`https://api.openweathermap.org/data/2.5/forecast?q=${formulario.nombre.value}`,2)
    pronosBusqueda.llamar()
})