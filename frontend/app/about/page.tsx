import { Metadata } from "next"

export const metadata: Metadata = {
	title: "TiBlog | Обо мне",
	description: "Информация обо мне"
}

const AboutPage = () => {
	return (
		<section className='mt-12.5'>
			<h1 className='vsm:text-7xl border-y border-y-[#a8a8a8] py-8 text-center text-6xl font-bold sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[240px]'>
				Тимур
			</h1>
			<div className='container mt-8 flex flex-col gap-8'>
				<div>
					<h3 className='text-2xl font-semibold text-white'>
						Обо мне
					</h3>
					<p>
						Добро пожаловать! Я профессиональный веб-разработчик с
						опытом работы в области веб-технологий. Сейчас я
						продолжаю улучшать свои навыки, создавать новые
						интересные проекты и учить новые технологии! Хочу найти
						работу и полезно использовать свои навыки.
					</p>{" "}
					<br />
					<p>
						Меня зовут Тимур, и я готов помочь вам с реализацией
						вашего проекта!
						<br />{" "}
					</p>
				</div>
				<div >
					<h3 className='text-2xl font-semibold '>
						Навыки
					</h3>
					<p>Вёрстка:</p>
					<p>HTML, JSX - Разметка</p>{" "}
					<p> CSS, SCSS, TAILWIND - Стилизация</p>
					<p>JS - Логика проекта</p>
					<p>Vite - Сборщик</p>
					<br />
					<p>Фронтенд:</p> <p> React/Next - Фреймворки</p>{" "}
					<p>CSS, SCSS, TAILWIND, SHADCN UI и т.д. - стилизация</p>{" "}
					<p>JS, TS - Функционал</p> <p>Vite - Сборщик</p> <br />{" "}
					<p>
						Также, недавно начал изучать WordPress. Если у вас есть
						простенький сайт, который нужно натянуть на WP -
						обращайтесь!
					</p>{" "}
				</div>
			</div>
		</section>
	)
}

export default AboutPage
