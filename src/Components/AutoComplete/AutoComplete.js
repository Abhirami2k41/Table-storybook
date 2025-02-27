
import React, { useState, useEffect } from "react";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TextField, IconButton,Icon } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import { AccountCircle, AddCircle, Delete, ShoppingCart} from '@mui/icons-material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


import { Search } from '@mui/icons-material';
const filter = createFilterOptions();

















const useStyles = makeStyles({
  
  optionContainer:{
    
    '&::-webkit-scrollbar': {
      width: '0px'
    },
  
  },
  noOption:{
   // color:'red !important',
   },
  

  dropdown: {
        width: (props) => props?.dropDownStyle?.width || 'auto',
        border: (props) => props?.dropDownStyle?.border || 'none',
      },
      
        root: {
            '& > *': {
             // color:"rgba(24, 24, 24, 1)",

              right: '10px',
              cursor:'pointer',
            },
            height:"55px",
            borderRadius: "4px",
            top:"10%",
            width:"100%",
            "& input::placeholder": {
              opacity:"100",
              textOverflow: "ellipsis"
            },


            '& .MuiAutocomplete-endAdornment':{
             
              right:'5px'
            }
  },
  errorIcon:{
    
    position:'absolute',
    right:"-8px",
    bottom:'6px',
    color:'red'

  },
 

});

const AutoComplete = (props) => {
  const classes = useStyles(props);
  const { label, option, variant, placeholder,value, add ,dropDownStyle,mandatory,showStartAdornment,showEndAdornment,iconPosition,position,icon,classProperties} = props;
 console.log('variant',variant,variant)
  const [data, setData] = React.useState(props.multiple ? [] : '');
 
 
 React.useEffect(() => {
  
  setData(props.value);

}, [props.value]);

 
  const handleChange = (event, value) => {
    
    if (props.multiple ) {
     
     
     let optionsSet=value.map((option)=>{
      if(typeof option==="string"){
       
        return {
          title: option
        };
      
      
      }
      else if(option && option.inputValue ){
        return {title: option.inputValue}

      }
      else{
      
        return option
      }
    
     })
  
     setData(optionsSet)
    
    
    } 
    
    else {
   
      if (value === null) {
        setData(value);
      } else if (typeof value === "string") {
        setData({
          title: value
        });
      } else if (value && value.inputValue) {
        setData({
          title: value.inputValue
        });
      } else {
        setData(value);
      }
    }
  };

 

  return (
    <>
    <Autocomplete
  
   
 
   popupIcon={<KeyboardArrowDownIcon/>}
  

   
      style={{...classProperties}}
      multiple={props.multiple}
    
      options={option?.length > 0 ? option.map((option) => option.value) : []}
      onChange={(event, value) => handleChange(event, value)}
      classes={{
        listbox:props.scrollVisible === undefined || props.scrollVisible?null:classes.optionContainer,
     
       paper: props.dropDownStyle ? classes.dropdown: null,
       noOptions:classes.noOption,
       
       

      
      }}
    
     
    
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
      
        if (params.inputValue !== "" && add === true ) {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`
          });
        } 
       
      
        return filtered.slice(0, 200);
      }}
      
      
      getOptionLabel={(option) => {
      
    
        
        if (typeof option === "string") {
        
          return option;
        }
        if (option.title) {
           return option.title;
         }
   
        return option.inputValue;
       
      }}
    
    isOptionEqualToValue={(option,value)=>(option === value.title || option !== value.title )}
   
   
      value={data? data:null}
     
      renderInput={(params) => {
        return (
          <TextField 
        // error={(mandatory===true || label?.includes("*")||placeholder?.includes("*"))&& (data===""|| data===null || data===undefined)?true:false}
          
           className={placeholder?.includes("*") || mandatory===true || label?.includes("*")? classes.placeholderText:classes.root}


            {...params}
            size="small"
            label={label}
            style={{ width: "100%" }}
            placeholder={placeholder}
            variant={variant}
         
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {params.InputProps.startAdornment}
                  {showStartAdornment && (
                    <InputAdornment position={position}>
                      <Icon>
                        <CheckCircleIcon />
                      </Icon>
                    </InputAdornment>
                  )}
                </>
              ),
              endAdornment: (
                <>
                   {params.InputProps.endAdornment}
                  {showEndAdornment && (
                    <InputAdornment position={position}>
                      <Icon>
                        <CheckCircleIcon />
                        
                      </Icon>
                    </InputAdornment>
                  )}
               
                 
                                    {mandatory &&  (
                    <InputAdornment position='end' className={classes.errorIcon}>
                      <Icon>
                        <ArrowRightIcon style={{color:'brown',rotate:'45deg',fontSize:'30px'}}/>
                      </Icon>
                    </InputAdornment>
                  )}
                
                       

                </>
              ),
            }}


        
        
        
        
            
            


            
          />
        );
      }}
    />
  

    </>
  );



};
  

export default AutoComplete;
  




