import React from 'react'
import Especialidadseccion from
 '@/features/page/sections/Especialidadseccion'
 import Certificaciones from
 '@/features/page/sections/Certificaciones'
 import Docentes from '@/features/page/Docentes'  
 import Testimonios from '@/features/page/sections/Testimonios'  
 import PreguntasFrecuentes from '@/features/page/sections/PreguntasFrecuentes'
 import Cursos from '@/features/page/sections/Cursos'
const landing = () => {
  return (
    <div>
      <Especialidadseccion />
      <Certificaciones />
      <Docentes />    
      <Testimonios />
      <PreguntasFrecuentes />
      <Cursos />
    </div>
  )
}

export default landing
