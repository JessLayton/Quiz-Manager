import React, { useEffect } from 'react';
import {
  makeStyles, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Typography,
} from '@material-ui/core';

import TableToolbar from './TableToolbar';
import NavBar from '../../NavBar';
import { getAllQuizzes, deleteQuiz } from '../../../connections/quizDatabaseService';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px',
  },
  tableHead: {
    textTransform: 'uppercase',
  },
  tableRow: {
    cursor: 'pointer',
  },
}));

const QuizTable = () => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState();
  const [quizRows, setQuizRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const [searchInput, setSearchInput] = React.useState('');

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, quizRows.length - page * rowsPerPage);

  const getQuizData = async () => {
    let quizResponse;
    try {
      quizResponse = await getAllQuizzes();
      if (quizResponse && quizResponse.data) {
        const quizData = quizResponse.data.quizzes;
        const rowData = [];
        quizData.forEach((quiz) => {
          rowData.push(quiz);
        });
        setQuizRows(rowData);
        setFilteredRows(rowData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuizData();
  }, []);

  const updateSearchInput = (input) => {
    const filtered = quizRows.filter((quiz) => quiz.name.toLowerCase().includes(input.toLowerCase()));
    setSearchInput(input);
    setFilteredRows(filtered);
  };

  const selectRow = (id, quizName) => {
    if (selected && selected.id === id) {
      setSelected();
    } else {
      setSelected({ id, quizName });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeQuiz = async () => {
    const quizId = selected.id;
    let quizResponse;
    try {
      quizResponse = await deleteQuiz(quizId);
      if (quizResponse) {
        getQuizData();
        setShowDeleteDialog(false);
        setSelected();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleShowDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  return (
    <>
      <NavBar pageHeading='Quizzes' />
      <Paper className={classes.root}>
        <TableToolbar
          selected={selected && selected.id}
          searchInput={searchInput}
          updateSearchInput={updateSearchInput}
          removeQuiz={removeQuiz}
          handleShowDeleteDialog={handleShowDeleteDialog}
        />
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <Typography>
                    <b>Quiz</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    <b>Description</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredRows
              )
                .map((row) => (
                  <TableRow
                    hover
                    onClick={() => selectRow(row._id, row.name)}
                    key={row._id}
                    id={row._id}
                    className={classes.tableRow}
                    style={selected && row._id === selected.id ? { backgroundColor: '#E2F7F7' } : { backgroundColor: 'white' }}
                  >
                    <TableCell>
                      <Typography>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {row.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: (53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteDialog open={showDeleteDialog} deleteQuiz={removeQuiz} handleClose={handleCloseDeleteDialog} quizName={selected ? selected.quizName : ''} />
    </>
  );
};
export default QuizTable;
