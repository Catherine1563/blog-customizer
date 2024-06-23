import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';

import { Separator } from '../separator';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';
import { Space } from '../space';


export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType | null>(defaultArticleState.fontFamilyOption);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(defaultArticleState.fontColor);
	const [selectedBackgroundColor, setBackgroundColor] = useState<OptionType | null>(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setContentWidth] = useState<OptionType | null>(defaultArticleState.contentWidth);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType | null>(defaultArticleState.fontSizeOption);

	function chekedLocalStoage(name: string, con: React.Dispatch<React.SetStateAction<OptionType | null>>){
		const saved = localStorage.getItem(`${name}`);
		if (saved) {
			const parsed = JSON.parse(saved);
			con(parsed);
		}
	}

	const handleApplyChanges = () => {
		localStorage.setItem('selectedFontFamily', JSON.stringify(selectedFontFamily));
		localStorage.setItem('selectedFontSize', JSON.stringify(selectedFontSize));
		localStorage.setItem('selectedFontColor', JSON.stringify(selectedFontColor));
		localStorage.setItem('selectedBackgroundColor', JSON.stringify(selectedBackgroundColor));
		localStorage.setItem('selectedContentWidth', JSON.stringify(selectedContentWidth));
	};

	useEffect(() => {
		chekedLocalStoage('selectedFontFamily', setSelectedFontFamily);
		chekedLocalStoage('selectedFontSize', setSelectedFontSize);
		chekedLocalStoage('selectedFontColor', setSelectedFontColor);
		chekedLocalStoage('selectedBackgroundColor', setBackgroundColor);
		chekedLocalStoage('selectedContentWidth', setContentWidth);
	}, []);

	const handleReset = () => {
    localStorage.clear();
		location.reload();
  };

	const handleToggleForm = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

	return (
		<>
			<ArrowButton onClick = {handleToggleForm} isOpen={isOpen} />
			<aside ref={formRef} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form}>
				<Text as='h1' size={31} weight={800} uppercase>
				задайте параметры
				</Text>
				<Space />
				<Select
					selected={selectedFontFamily}
					options={fontFamilyOptions}
					placeholder="Выберите ширифт"
					onChange={(option) => setSelectedFontFamily(option)}
					onClose={() => setIsOpen(false)}
					title="шрифт"
				/>
				<Space />
				<RadioGroup 
					name='fontSize'
					options={fontSizeOptions}
					selected={selectedFontSize || defaultArticleState.fontSizeOption}
					onChange={(option) => setSelectedFontSize(option)}
					title="размер шрифта"
				/>
				<Space />
				<Select
					selected={selectedFontColor}
					options={fontColors}
					placeholder="Выберите цвет"
					onChange={(option) => setSelectedFontColor(option)}
					onClose={() => setIsOpen(false)}
					title="цвет шрифта"
				/>
				<Space />
				<Separator />
				<Space />
				<Select
					selected={selectedBackgroundColor}
					options={backgroundColors}
					placeholder="Выберите цвет"
					onChange={(option) => setBackgroundColor(option)}
					onClose={() => setIsOpen(false)}
					title="цвет фона"
				/>
				<Space />
				<Select
					selected={selectedContentWidth}
					options={contentWidthArr}
					placeholder="Выберите ширину"
					onChange={(option) => setContentWidth(option)}
					onClose={() => setIsOpen(false)}
					title="ширина контента"
				/>
				<Space />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset}/>
						<Button title='Применить' type='submit' onClick={handleApplyChanges} />
					</div>
				</form>
			</aside>
		</>
	);
};
