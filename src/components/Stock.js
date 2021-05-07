import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "react-bootstrap";
import { TablePagination } from "@material-ui/core";
import { FaWindowClose } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import "./style.stock.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addProducts,
  UpdataProducts,
  deleteProducts,
} from "../store/actions/Action.product";
import { clearMessage } from "../store/actions/message";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  container: {
    //marginTop:"-800px",
    width: "auto",
    height: "100vh",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginBottom: "120px",
    marginRight: "140px",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Stock() {
  const classes = useStyles();
  const [showForm, setShowForm] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState();
  const Allproducts = useSelector((state) => state.product);
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const formDefault = [
    {
      id: "",
      skuID: "",
      img_name: "",
      name: "",
      des: "",
      quantity: "",
      price: "",
      category: "",
    },
  ];
  const [formData, setform] = React.useState(formDefault);
  const [errors, setError] = React.useState(null);
  const [uploadfile, setFile] = React.useState(null);
  const showform = (index) => {
    dispatch(clearMessage());
    setShowForm(false);
    if (activeTab === index) {
      setActiveTab(-1);
    } else setActiveTab(index);
  };
  const showformAdd = (show) => {
    dispatch(clearMessage());
    setActiveTab(-1);
    if (show === true) {
      setShowForm(true);
    } else setShowForm(false);
  };
  const handleChange = (e) => {
    setform({ ...formData, [e.target.name]: e.target.value });
  };
  //remove image
  const removefile = (id) => {
    const form = new FormData();
    form.append("img_name", null);
    dispatch(UpdataProducts(id, form));
  };
  //Reset form
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setform(formDefault);
  };
  //add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = new FormData();
    if (uploadfile !== null) {
      form.append("uploadfile", uploadfile);
    }
    if (formData.skuID !== undefined) {
      form.append("skuID", formData.skuID);
    }
    if (formData.name !== undefined) {
      form.append("name", formData.name);
    }
    if (formData.des !== undefined) {
      form.append("des", formData.des);
    }
    if (formData.quantity !== undefined) {
      form.append("quantity", formData.quantity);
    }
    if (formData.price !== undefined) {
      form.append("price", formData.price);
    }
    if (formData.category !== undefined) {
      form.append("category", formData.category);
    }
    dispatch(addProducts(form));
    setform(formDefault);
    setFile(null);
    setShowForm(false);
  };
  //Update Product
  const handleUpdataProducts = async (e, id) => {
    e.preventDefault();
    const form = new FormData();
    if (uploadfile !== undefined) {
      form.append("uploadfile", uploadfile);
    }
    if (formData.img_name !== undefined) {
      form.append("img_name", formData.img_name);
    }
    if (formData.skuID !== undefined) {
      form.append("skuID", formData.skuID);
    }
    if (formData.name !== undefined) {
      form.append("name", formData.name);
    }
    if (formData.des !== undefined) {
      form.append("des", formData.des);
    }
    if (formData.quantity !== undefined) {
      form.append("quantity", formData.quantity);
    }
    if (formData.price !== undefined) {
      form.append("price", formData.price);
    }
    if (formData.category !== undefined) {
      form.append("category", formData.category);
    }
    console.log("message :", messages.message);
    // if (formData.id !== undefined) {
    dispatch(UpdataProducts(id, form));
    // setError(null);
    setFile(null);
    // } else if (formData.id === undefined) {
    //   setError("ID is not valid");
    // }
  };
  //Delete Product
  const deleteProduct = (id) => {
    dispatch(deleteProducts(id));
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, Allproducts.products.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Sku ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell> Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>
                    <div className="con-table">
                      <span>
                        <Button
                          className="btn-add-data"
                          onClick={() => showformAdd(true)}
                        >
                          <AddIcon />
                          <span>Add</span>
                        </Button>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              {showForm === true ? (
                //Form add product
                <TableRow className="table-Row">
                  <p>
                    <b>Add product </b>
                  </p>
                  <div role="alert">
                    <i style={{ color: messages.color }}>{messages.message}</i>
                  </div>
                  <hr />
                  <TableCell>
                    <p>Sku ID</p>
                    <input
                      type="text"
                      name="skuID"
                      value={formData.skuID}
                      onChange={handleChange}
                      placeholder={"skuID"}
                    ></input>
                  </TableCell>
                  <TableCell>
                    <p>name</p>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={"name"}
                    ></input>
                    <p>des</p>
                    <input
                      type="text"
                      name="des"
                      value={formData.des}
                      onChange={handleChange}
                      placeholder={"des"}
                    ></input>
                  </TableCell>
                  <TableCell>
                    <p>quantity</p>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder={"quantity"}
                    ></input>

                    <p>price</p>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder={"price"}
                    ></input>
                  </TableCell>
                  <TableCell>
                    <p>category</p>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder={"category"}
                    ></input>
                    <p>file Image</p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFile(e.target.files[0])}
                      name="uploadfile"
                      // value={formData.uploadfile}
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="con-button-close"
                      onClick={() => showformAdd(false)}
                    >
                      <FaWindowClose />
                    </div>
                    <Button
                      className="con-button-update"
                      onClick={() => {
                        handleAddProduct();
                        handleReset();
                      }}
                    >
                      ADD
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null}
              <TableBody>
                {Allproducts.products.length > 0 &&
                  Allproducts.products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => (
                      <>
                        <TableRow key={i}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.skuID}</TableCell>
                          <TableCell>
                            <img
                              src={row.img_name}
                              alt={row.name}
                              width={120}
                              height={80}
                            />
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.des}</TableCell>
                          <TableCell>
                            <div className="con-button">
                              <Button
                                className="button-edit"
                                onClick={() => showform(i)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="button-delete"
                                onClick={() => {
                                  deleteProduct(row.id);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {activeTab === i ? (
                          //Form edit product
                          <TableRow className="table-Row">
                            <p>
                              <b>Update ID {row.id}</b>
                            </p>
                            <p style={{ color: "red" }}>{errors}</p>
                            <div role="alert">
                              <p>
                                <i style={{ color: messages.color }}>
                                  {messages.message}
                                </i>
                              </p>
                            </div>
                            <hr />
                            <TableCell>
                              {/* <p>Id</p>
                              <input
                                required
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                placeholder={row.id}
                              ></input> */}

                              <p>name</p>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={row.name}
                              ></input>

                              <p>Sku ID</p>
                              <input
                                required
                                type="text"
                                name="skuID"
                                value={formData.skuID}
                                onChange={handleChange}
                                placeholder={row.skuID}
                              ></input>
                            </TableCell>
                            <TableCell>
                              <p>des</p>
                              <input
                                type="text"
                                name="des"
                                value={formData.des}
                                onChange={handleChange}
                                placeholder={row.des}
                              ></input>

                              <p>quantity</p>
                              <input
                                type="text"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder={row.quantity}
                              ></input>
                            </TableCell>{" "}
                            <TableCell>
                              <p>price</p>
                              <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder={row.price}
                              ></input>
                              <p>category</p>
                              <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder={row.category}
                              ></input>
                            </TableCell>
                            <TableCell>
                              <p>Change Image</p>
                              <input
                                type="file"
                                multiple
                                onChange={(e) => setFile(e.target.files[0])}
                                name="uploadfile"
                              />
                              <p>Click botton for remove image</p>
                              <div>
                                <Button onClick={() => removefile(row.id)}>
                                  remove image
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className="con-button-close"
                                onClick={() => showform()}
                              >
                                <FaWindowClose />
                              </div>
                              <div>
                                <Button
                                  className="con-button-update"
                                  onClick={(e) => {
                                    handleUpdataProducts(e, row.id);
                                    handleReset();
                                  }}
                                >
                                  Update
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </>
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
                <TablePagination
                  rowsPerPageOptions={[5, 15, 25, 50, 100]}
                  count={Allproducts.products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stock;
