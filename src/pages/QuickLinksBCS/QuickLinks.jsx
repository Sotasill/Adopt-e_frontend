import { useState } from 'react';
import { Button } from '@mui/material';
import SearchbarBCS from '../../components/SearchbarBCS/SearchbarBCS';
import styles from './QuickLinks.module.css';

const QuickLinks = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className={styles.quickLinksContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="primary"
            className={styles.quickLinkButton}
            size="small"
          >
            Добавить животное
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.quickLinkButton}
            size="small"
          >
            Просмотр животных
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.quickLinkButton}
            size="small"
          >
            Календарь
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.quickLinkButton}
            size="small"
          >
            Отчеты
          </Button>
        </div>
        <div className={styles.searchBox}>
          <SearchbarBCS 
            isExpanded={isSearchExpanded}
            onToggle={handleSearchToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
