export const ProductDummyTitleRenderer: React.FC<{ totalPrice: number }> = ({ totalPrice }) => {
  const price = totalPrice ? totalPrice.toFixed(2) : '0.00'

  return (
    <div>
      <span>Product Title</span>
      <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
        Total Price: ${price ? totalPrice.toFixed(2) : '0.00'}
      </span>
    </div>
  )
}
