import React from "react";
import { Dropdown,DropdownButton, Form} from "react-bootstrap";


function OwnershipDropDown(Book){
    return(
        <td>
    <DropdownButton id={`${Book.EDITON}-OwnershipDropDown`} variant='dark' menuVariant="dark" title='Ownership Status' size='sm'>
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
<DropdownButton id={`${Book.EDITON}-ReadDropDown`} variant='dark' menuVariant="dark" title='Read Status' size='sm'>
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
                <select id={`${Book.EDITON}-ReadList`} className='form-control'>
                    <option value="N/A">N/A</option>
                    <option value="READ">Read</option>
                    <option value="READING">Reading</option>
                    <option value="TBR">TBR</option>
                </select>
    </td>
    )
}

//TODO - in the stored procedure, change it so that the return value is just the number, we'll default the selected to whatever is returned

function OwnershipList(Book){
    return(
        <td>
            <select id={`${Book.EDITON}-OwnershipList`} className='form-control'>
                <option value="N/A">N/A</option>
                <option value='WANT'>Want</option>
                <option value='OWN'>Own</option>
            </select>
        </td>
    )

}

export{OwnershipDropDown,ReadDropDown,ReadList,OwnershipList}