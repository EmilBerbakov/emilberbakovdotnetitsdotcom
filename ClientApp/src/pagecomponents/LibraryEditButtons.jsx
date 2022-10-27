import React from "react";
import { Dropdown,DropdownButton, Form} from "react-bootstrap";


function OwnershipDropDown(Book){
    return(
        <td>
    <DropdownButton id={`${Book.EDITON_ID}-OwnershipDropDown`} variant='dark' menuVariant="dark" title='Ownership Status' size='sm'>
        <Dropdown.Item type='button' value='N/A'>N/A</Dropdown.Item>
        <Dropdown.Item type='button' value='WANT'>Want</Dropdown.Item>
        <Dropdown.Item type='button' value='OWN'>Own</Dropdown.Item>
    </DropdownButton>
    </td>
    )
}

function ReadDropDown(Book){
return(
    <>
<td>
<DropdownButton id={`${Book.EDITON_ID}-ReadDropDown`} variant='dark' menuVariant="dark" title='Read Status' size='sm'>
    <Dropdown.Item type='button' value='N/A'>N/A</Dropdown.Item>
    <Dropdown.Item type='button' value='READ'>Read</Dropdown.Item>
    <Dropdown.Item type='button' value='READING'>Reading</Dropdown.Item>
    <Dropdown.Item type='button' value='TBR'>TBR</Dropdown.Item>
</DropdownButton>
</td>
</>
)
}
//TODO - in the stored procedure, change it so that the return value is just the number, we'll default the selected to whatever is returned

function ReadList(Book){
    return(
    <td>
                <select id={`${Book.Book.EDITION_ID}-ReadList`} defaultValue={Book.Book.INFO.READ_STATUS??"N/A"} className='form-control'>
                    <option value="N/A" disabled>N/A</option>
                    <option value="1">Read</option>
                    <option value="2">Reading</option>
                    <option value="3">TBR</option>
                    <option value="4">DNF</option>
                </select>
    </td>
    )
}

//TODO - in the stored procedure, change it so that the return value is just the number, we'll default the selected to whatever is returned

function OwnershipList(Book){
    return(
        <td>
            <select id={`${Book.Book.EDITION_ID}-OwnershipList`} defaultValue={Book.Book.INFO.OWNERSHIP_STATUS??"N/A"} className='form-control'>
                <option value="N/A" disabled>N/A</option>
                <option value='1'>Want</option>
                <option value='2'>Own</option>
            </select>
        </td>
    )

}

export{OwnershipDropDown,ReadDropDown,ReadList,OwnershipList}