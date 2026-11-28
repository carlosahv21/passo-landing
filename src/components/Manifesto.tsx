import Reveal from './ui/Reveal';

// Frase de la marca: entre comillas y en cursiva, a todo el ancho; la firma debajo a la derecha
const Manifesto = () => (
    <section className="relative py-14 md:py-20">
        <div className="contenedor">
            <Reveal>
                <blockquote className="t-cita italic text-tinta xl:whitespace-nowrap text-center">
                    “El baile conecta personas. <span className="text-azul">El baile transforma vidas.</span>”
                </blockquote>
                <p className="mt-4 t-lead text-gris text-center md:text-right">Cada alumno deja una huella. Passo la registra.</p>
            </Reveal>
        </div>
    </section>
);

export default Manifesto;
