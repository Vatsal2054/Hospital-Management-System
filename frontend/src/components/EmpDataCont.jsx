import React, { useMemo } from "react";
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";


function EmpDataCont(props) {
	const empData = props.empData;
	empData.forEach((emp, index) => { emp.serial = index + 1; });
	
	const data = empData;
	const columns = useMemo(() => [
		{
			header: 'Sr',
			accessorKey: 'serial',
		},
		{
			header: 'Employee ID',
			accessorKey: 'employee_id',
		},
		{
			header: 'Name',
			accessorKey: 'name',
		},
		{
			header: 'Gender',
			accessorKey: 'Gender',
		},
		{
			header: 'Contact',
			accessorKey: 'contact',
		},
		{
			header: 'Address',
			accessorKey: 'Address',
		}
	], []);
	
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

	return (
		<div className="info-container-data">
			<table className="admin-table">
				{table.getHeaderGroups().map(headerGroup => (
					<tr key = {headerGroup.id} className="admin-table-row">
						{headerGroup.headers.map(header => (
							<th key = {header.id} className="admin-table-head">
								{flexRender(header.column.columnDef.header, 
									header.getContext())}
							</th>
						))}
					</tr>
				))}
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key = {row.id} className="admin-table-data-row">
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell,
										cell.getContext())}
								</td>
							))}
						<br className="admin-table-br"/>
						</tr>
					))}
				</tbody>
			</table>
			<div className="table-buttons">
				<button onClick={() => table.setPageIndex(0)} className="menu-button">First page</button>
				<button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="menu-button"><FaAngleLeft className="react-icons-arrows-left"/></button>
				<button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="menu-button"><FaAngleRight className="react-icons-arrows-right" /></button>
				<button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="menu-button">Last page</button>
			</div>
		</div>
	);
}

export default EmpDataCont;
