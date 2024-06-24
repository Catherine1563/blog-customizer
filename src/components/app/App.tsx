import { Article } from "../article";
import { ArticleParamsForm } from "../article-params-form";
import styles from './index.module.scss';

export const App = () => {
	return (
		<main className={styles.main} >
			<ArticleParamsForm />
			<Article />
		</main>
	);
};