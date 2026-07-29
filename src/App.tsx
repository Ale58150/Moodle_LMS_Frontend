import Especialidadseccion from "./features/page/sections/Especialidadseccion";
import Certificaciones from "./features/page/sections/Certificaciones";
import Docentes from "./features/page/Docentes";
import Testimonio from "./features/page/sections/Testimonios"; 
import PreguntasFrecuentes from "./features/page/sections/PreguntasFrecuentes";
import Cursos from "./features/page/sections/Cursos";


function App() {
  return (
    <main>
      <Certificaciones />
      <Especialidadseccion />
      <Cursos />
      <Docentes />
      <Testimonio />  
      <PreguntasFrecuentes />
      
    </main>
  );
}

export default App;