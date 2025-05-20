const BannerImg = () => {
    return (
        <>
            <div className="px-4 py-8 text-center font-semibold text-gray-800 sm:px-6 lg:px-8">
                <p className="text-lg sm:text-xl">Sumérgete, conoce y sé parte de nuestra historia.</p>
                <h4 className="mt-4 text-3xl font-extrabold uppercase text-rose-600 sm:text-5xl lg:text-6xl leading-tight">
                    La Evolución de Cananea, Sonora: Historia y Progreso
                </h4>
                <p className="mt-3 text-base text-gray-700 sm:text-lg">
                Sector más antiguo de El Ronquillo. A la derecha en primer plano se observa la comisaría, después la zona habitacional y fundición; 
                y a la izquierda todos los edificios terminados en 1902.
                <span>
                {" "} Para mas informacion esta imagen viene de este blog (<a className="hover:text-rose-600 text-red-500" href={'https://cronicasdecananea.blogspot.com/2016/05/elronquillo-y-su-evolucion-hasta-la.html'}>cronicasdecananea</a>)
                </span>
                </p>
            </div>
            <div
                className="w-full h-[200px] sm:h-[400px] lg:h-[600px] bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/18_ElRonquillo.png')" }}
            />
        </>
    );
};

export default BannerImg;
