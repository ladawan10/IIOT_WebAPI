import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { Button ,useColorModeValue} from "@chakra-ui/react";

const Tableshow = props => {
  const columns = [
    // {
    //   name: "Action",
    //   button: true,
    //   cell: row =>
    //     // row.showButtons ? 
    //     (
    //       <>
    //         <Button
    //           onClick={() => props.click(row)}
    //           colorScheme='yellow'
    //         >
    //           Assign
    //         </Button>
    //       </>
    //     )
    //     //  : null
    // },
    {
      name: "Order ID",
      selector: "Order_ID",
      sortable: true,
      // grow: 1
    },
    {
      name: "Material",
      selector: "Mat_No",
      sortable: true
    },
    {
      name: "Material Description",
      selector: "MatDesc",
      sortable: true,
      grow: 2
    },
    {
      name: "TargetQty",
      selector: "TargetQty",
      sortable: true
    },
    {
      name: "Unit",
      selector: "Unit",
      sortable: false
    },
    {
      name: "Activity",
      selector: "Activity",
      sortable: true
    },
    {
      name: "StartDate",
      selector: "BS_StartDate",
      sortable: true,
      // grow: 2
    },
    {
      name: "OperationShortText",
      selector: "OptShortText",
      sortable: true,
      grow: 2
    },
    // {
    //   name: "Email",
    //   selector: "email",
    //   sortable: true,
    //   hide: "sm"
    // },
    {
      name: "Action",
      button: true,
      cell: row =>
        // row.showButtons ? 
        (
          <>
            <Button
              onClick={() => props.click(row)}
              colorScheme='yellow'
            >
              Assign
            </Button>
          </>
        )
        //  : null
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);


  const customStyles = {
    rows: {
        style: {
            // minHeight: '72px', // override the row height
            backgroundColor:useColorModeValue("white", "#1A202C"),
            color:useColorModeValue("#000000", "#ffffff")
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize:'1.2rem',
            backgroundColor:useColorModeValue("white", "#1A202C"),
            color:useColorModeValue("#000000", "#ffffff")
            
        },
    },
    cells: {
        style: {
            fontSize:'1rem',
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            backgroundColor:useColorModeValue("white", "#1A202C"),
            color:useColorModeValue("#000000", "#ffffff")
        },
    },
    pagination: {
      style: {
          backgroundColor:useColorModeValue("white", "#1A202C"),
          color:useColorModeValue("#000000", "#ffffff")
      },
  },
  subHeader: {
    style: {
        backgroundColor:useColorModeValue("white", "#1A202C"),
        color:useColorModeValue("#000000", "#ffffff")
    },
},
  
};

  return (
    <DataTable
    //   title="Contact List"
      columns={columns}
      data={filteredItems}
      defaultSortField="Order_ID"
      // striped
      pagination
      subHeader
      customStyles={customStyles}
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Tableshow;
