import { SOCIAL_ITEMS } from "@/src/shared/constants"

export const Footer = () => {
	return (
		<footer className='mt-7.5 h-21 text-xl container flex sm:flex-row flex-col items-center gap-3.5'>
			<p>© 2026</p>
			<ul className='flex items-center gap-3.5'>
				{SOCIAL_ITEMS.map(social => (
					<li key={social.href}>
						<a href={social.href}>{social.name}</a>
					</li>
				))}
			</ul>
		</footer>
	)
}
