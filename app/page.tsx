import { SliderClient } from "@comps/client/Slider";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";

export default async function HomePage() {

    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded";
    
    return (
        <div className="min-h-full w-full bg-white">
            <section className="flex flex-row items-center justify-between gap-12 bg-primary p-16">
                <div className="w-full text-nowrap text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <div className="text-white">Passez au</div>
                    <div className="text-secondary">zéro déchet</div>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <ImageRatio
                        src="/illustration/produit 2.jpg"
                        alt="produit"
                        className={imageClass}
                    />
                    <ImageRatio
                        src="/illustration/coton 3.jpg"
                        alt="coton"
                        className={combo("max-md:hidden",imageClass)}
                    />
                </div>
            </section>

            {/* 🟠 Section Catégories avec Swiper */}
            <section className="p-6 md:p-8">
                <h2 className="text-center text-xl font-bold text-primary md:text-2xl lg:text-3xl">
                    Catégories de Produit
                </h2>
                <div className="mt-6">
                    <SliderClient
                        imageList={[
                            "/illustration/pshit 1.jpg",
                            "/illustration/pshit 2.jpg",
                            "/illustration/coton 1.jpg",
                            "/illustration/coton 2.jpg",
                            "/illustration/lessive 1.jpg",
                            "/illustration/lessive 2.jpg",
                        ]}
                    />
                </div>
            </section>

            {/* 🔵 Section DIY avec Swiper + images réduites */}
            <section className="bg-[#0A0A2C] p-6 text-center text-white md:p-8">
                <h2 className="text-xl font-bold md:text-2xl">DIY à reproduire à la maison</h2>
                <div className="mx-auto mt-6 max-w-2xl">
                    <SliderClient
                        imageList={[
                            "/illustration/pshit 1.jpg",
                            "/illustration/pshit 2.jpg",
                            "/illustration/coton 1.jpg",
                            "/illustration/coton 2.jpg",
                        ]}
                    />
                </div>
            </section>

            {/* 🟣 Articles recommandés avec Swiper + images réduites */}
            <section className="p-6 md:p-8">
                <h2 className="text-center text-xl font-bold text-primary md:text-2xl lg:text-3xl">
                    Articles qui pourraient vous plaire !
                </h2>
                <div className="mx-auto mt-6 max-w-2xl">
                    <SliderClient
                        imageList={[
                            "/illustration/pshit 1.jpg",
                            "/illustration/pshit 2.jpg",
                            "/illustration/coton 1.jpg",
                            "/illustration/coton 2.jpg",
                        ]}
                    />
                </div>
            </section>

            {/* 🟢 Newsletter */}
            <section className="bg-[#0A0A2C] p-6 text-center text-white md:p-8">
                <h2 className="text-xl font-bold md:text-2xl">Restez informé(e) avec notre Newsletter !</h2>
                <p className="mx-auto mt-2 max-w-xl text-gray-300">
                    Recevez des conseils et astuces directement dans votre boîte mail.
                </p>
                <div className="mt-4 flex justify-center">
                    <input
                        type="email"
                        placeholder="Adresse mail"
                        className="w-64 rounded-l-md p-2 text-black transition-all focus:ring-2 focus:ring-cyan-500"
                    />
                    <button className="rounded-r-md bg-cyan-500 px-4 py-2 transition-all hover:bg-cyan-400">
                        S&apos;inscrire
                    </button>
                </div>
            </section>

            {/* 🟠 Bannière Zéro Déchets (une seule image) */}
<section className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:p-8 md:text-left">
    <div className="md:w-1/2">
        <h2 className="text-xl font-bold text-primary md:text-2xl">Adoptez le zéro déchets !</h2>
        <p className="mt-2 text-gray-700">Découvrez nos solutions pour un mode de vie plus responsable.</p>
    </div>
</section>


            {/* ⚫ Footer */}
            <footer className="bg-[#0A0A2C] p-6 text-center text-white md:p-8">
                <div className="flex flex-col items-center">
                    <div className="size-16 rounded-full bg-gray-600"></div>
                    <h3 className="mt-2 font-bold">CIRKL</h3>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                    <span>Produits</span>
                    <span>DIY à Reproduire</span>
                    <span>Articles</span>
                    <span>Conditions</span>
                </div>
            </footer>
        </div>
    );
}
