import { createRoot } from 'react-dom/client';
import { StrictMode, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';


import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	useEffect(() => {
		const fontFamily = localStorage.getItem('selectedFontFamily');
		if (fontFamily) {
			const parsedFontFamily = JSON.parse(fontFamily);
			document.documentElement.style.setProperty('--font-family', parsedFontFamily.value);
		}
		const fontSize = localStorage.getItem('selectedFontSize');
			if (fontSize) {
				const parsedFontSize = JSON.parse(fontSize);
				document.documentElement.style.setProperty('--font-size', parsedFontSize.value);
			}
			const savedFontColor = localStorage.getItem('selectedFontColor');
			if (savedFontColor) {
				const parsedFontColor = JSON.parse(savedFontColor);
				document.documentElement.style.setProperty('--font-color', parsedFontColor.value);
			}
			const savedBackgroundColor = localStorage.getItem('selectedBackgroundColor');
			if (savedBackgroundColor) {
				const parsedBackgroundColor = JSON.parse(savedBackgroundColor);
				document.documentElement.style.setProperty('--bg-color', parsedBackgroundColor.value);
			}
			const savedContentWidth = localStorage.getItem('selectedContentWidth');
			if (savedContentWidth) {
				const parsedContentWidth = JSON.parse(savedContentWidth);
				document.documentElement.style.setProperty('--container-width', parsedContentWidth.value);
			}
	}, []);
	return (
		<div className={clsx(styles.main)} >
			<ArticleParamsForm />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
