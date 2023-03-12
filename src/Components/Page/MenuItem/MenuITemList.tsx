import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useGetMenuItemsQuery } from '../../../api/menuItemApi';
import { menuItemModel } from '../../../interfaces';
import { MainLiader } from '../../../Pages/Common';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import MenuItemCard from './MenuItemCard';

function MenuITemList() {
      //const [menuItems, setMenuItems] = useState<interfaces.menuItemModel[]>([]);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLiader/>
  }

  return (
    <div className='container row'>
      {data.result.length > 0 && data.result.map((menuItem: menuItemModel, index: number) => (
        <MenuItemCard menuItem={menuItem} key={index} />
      ))}
    </div>
  )
}

export default MenuITemList;