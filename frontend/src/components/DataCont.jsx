import React, { useMemo, useState } from "react";
import { TableOptions, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ViewEmp from "./ViewEmp";
import {columns} from "./TableContents";


function EmpDataCont(props) {
	const receivedData = props.Data;
	receivedData.forEach((cell, index) => { cell.serial = index + 1; });

	const data = receivedData;
	
	const table = useReactTable({
		data, columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			globalFilter: props.filterInput,
		},
		onGlobalFilterChange: props.setFilterInput
	});

	function showDetails(id) {
		console.log("Row clicked");
		props.setViewEmpData(receivedData[id]);
		props.setViewEmp(true);
		console.log(id);
	}

	return (
		<div className="info-container-data">
			<table className="admin-table">
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id} className="admin-table-row">
						{headerGroup.headers.map(header => (
							<th key={header.id} className="admin-table-head">
								{flexRender(header.column.columnDef.header,
									header.getContext())}
							</th>
						))}
					</tr>
				))}
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id} className="admin-table-data-row" onClick={() => { showDetails(row.id) }}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell,
										cell.getContext())}
								</td>
							))}
							<br className="admin-table-br" />
						</tr>
					))}
				</tbody>
			</table>
			<div className="table-buttons">
				<button onClick={() => table.setPageIndex(0)} className="menu-button">First page</button>
				<button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="menu-button"><FaAngleLeft className="react-icons-arrows-left" /></button>
				<button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="menu-button"><FaAngleRight className="react-icons-arrows-right" /></button>
				<button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="menu-button">Last page</button>
			</div>
		</div>
	);
}

export default EmpDataCont;