import { AddCategoryForm } from "@/src/features"
import { CategoriesList } from "@/src/widgets"

const AdminCategoriesPage = () => {
	return (
		<section className='container mt-10 flex flex-col-reverse items-start justify-between gap-10 md:flex-row'>
			<CategoriesList />
			<div className='w-full flex-1 lg:min-w-150'>
				<h4 className='text-xl'>Добавить новую категорию</h4>
				<AddCategoryForm />
			</div>
		</section>
	)
}

export default AdminCategoriesPage
