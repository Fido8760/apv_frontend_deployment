import { useState } from "react";
import { Link } from "react-router-dom";
import ALerta from '../components/Alerta';
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";

const OlvidePasword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if(email === '' || email.length < 6){
      setAlerta({msg: 'El Email es obligatorio', error: true});
      return;
    }

    try {
      const { data } = await clienteAxios.post('veterinarios/olvide-password', {email});
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Recupera tu password <span className=" text-black">con tu Email</span></h1>
      </div>
      <div className=' mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white'>
        { msg && <Alerta
          alerta={alerta}
        />}
        <form action="" onSubmit={handleSubmit}>

          <div className=" my-5">
            <label className=" uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email:</label>
            <input
              type="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Tu Email Registrado"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className=" bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />

          <nav className=' mt-10 lg:flex lg:justify-between'>

            <Link  
              to="/registrar"
              className='block text-center my-5 text-gray-500'
            >¿No tienes una cuenta? Regístrate </Link>

            <Link
              to="/"
              className='block text-center my-5 text-gray-500'
            >¿Ya tienes una cuenta? Inicia Sesión </Link>

          </nav>
        </form>


      </div>
    </>
  )
}

export default OlvidePasword