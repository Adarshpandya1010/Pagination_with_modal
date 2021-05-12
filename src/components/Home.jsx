import { Button, List, ListItem, Modal } from "@material-ui/core";
import "react-table-v6/react-table.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table-v6";
import { pageData } from "../service/redux/Action";

export default function Home() {
  const [count, setcount] = useState(0);
  const [loading] = useState("loading. . . . . . . . . . . . . . . ");
  const [original, setoriginal] = useState();
  const [open, setopen] = useState(false);
  const data = useSelector((state) => state.getData);
  const dispatch = useDispatch();

  const handler = (data) => {
    setoriginal(data);
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };
  useEffect(() => {
    const fetch = () => {
      const url = `http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`;
      dispatch(pageData(url));
    };
    setTimeout(() => {
      fetch();
      setcount(count + 1);
    }, 2 * 1000);
  }, [dispatch, count]);

  const columns = [
    {
      Header: () => <h3 className="row-design">TITLE</h3>,
      accessor: "title",
      filterable: true,
    },
    {
      Header: () => <h3 className="row-design">AUTHOR</h3>,
      accessor: "author",
    },
    {
      Header: () => <h3 className="row-design">CREATE_AT</h3>,
      accessor: "created_at",
      filterable: true,
    },
    {
      Header: () => <h3 className="row-design">URL</h3>,
      accessor: "url",
      Cell: (props) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            href={props.value || "#"}
            target="_blank"
          >
            URL
          </Button>
        );
      },
    },
    {
      Header: () => <h3 className="row-design">Action</h3>,
      Cell: (props) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handler(props.original);
            }}
          >
            Raw_Json
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        noDataText={loading}
        className="-striped - highlight"
      ></ReactTable>
      <Modal
        open={open}
        style={{
          backgroundColor: "white",
        }}
      >
        <>
          <List>
            <ListItem> {JSON.stringify(original)}</ListItem>
          </List>
          <Button variant="contained" color="primary" onClick={handleClose}>
            close
          </Button>
        </>
      </Modal>
    </div>
  );
}
