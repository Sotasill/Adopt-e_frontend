import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import styles from "./SerachResults.module.css";

const SearchResults = () => {
  const { results, loading, error } = useSelector((state) => state.search);

  if (loading) {
    return <Typography>Поиск...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!results.length) {
    return null;
  }

  return (
    <List className={styles.resultsList}>
      {results.map((result) => (
        <ListItem key={result.id} button>
          <ListItemText primary={result.title} secondary={result.type} />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;
