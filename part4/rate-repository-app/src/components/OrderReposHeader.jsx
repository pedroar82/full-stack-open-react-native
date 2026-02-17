import  { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    borderColor: '#d1d5da',
  },
});

const OrderReposHeader = ({ selectedSorting, setSorting }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const sortingOptions = [
    { label: 'Latest repositories', value: 'CREATED_AT', direction: 'DESC' },
    {
      label: 'Highest rated repositories',
      value: 'RATING_AVERAGE',
      direction: 'DESC',
    },
    {
      label: 'Lowest rated repositories',
      value: 'RATING_AVERAGE',
      direction: 'ASC',
    },
  ]

  const handleSelect = (orderBy, orderDirection) => {
    setSorting({ orderBy, orderDirection })
    closeMenu()
  }

  const selectedLabel =
    sortingOptions.find(
      (option) =>
        option.value === selectedSorting.orderBy &&
        option.direction === selectedSorting.orderDirection,
    )?.label || 'Latest repositories'

 return (
   <View style={styles.container}>
     <Menu
       visible={visible}
       onDismiss={closeMenu}
       anchor={
         <Button mode="outlined" onPress={openMenu} style={styles.button}>
           {selectedLabel}
         </Button>
       }
     >
       {sortingOptions.map((option) => (
         <Menu.Item
           key={`${option.value}-${option.direction}`}
           onPress={() => handleSelect(option.value, option.direction)}
           title={option.label}
         />
       ))}
     </Menu>
   </View>
 )
};

export default OrderReposHeader;