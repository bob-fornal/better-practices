# React Better Practices

## Table of Contents

1. [Arrays](#arrays)
1. [Functional Components and Classes](#functional-components-and-classes)

## Arrays

### Use Unique Identifiers as Keys
###### [Better Practice [RT002](#better-practice-rt002)]

  * Do not use index to identify items in an array.

  *Why?* With keys, React can pinpoint which item has been changed, added, or removed from the array.

Instead of this pattern that will work at time ...

```javascript
const Items = () => {
  const items = [ 'item1', 'item2', 'item3', 'item4', 'item5' ];

  return (
    <>
      {items.map((element, index) => {
        <li key={ index }>{ element }</li>
      })}
    </>
  );
};
```

Using the `index` as a key can introduce issues especially if the list is expected to change. Consider this code ...

```javascript
const Items = () => {
  const items = [ 'item1', 'item2', 'item3', 'item4', 'item5' ];

  return (
    <>
      {items.map((element) => {
        <li key={ element }>{ element }</li>
      })}
    </>
  );
};
```

**[Back to top](#table-of-contents)**

## Functional Components and Classes

### Use Functional Components and Hooks
###### [Better Practice [RT001](#better-practice-rt001)]

  * Use functional components and hooks.

  *Why?* They result in more concise and readable code.

Consider the following class example ...

```javascript
class Category extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('api/category')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: json
        });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <h1>Data</h1>
        {data.map((item) => (
          <div key={ item.id }>{ item.title }</div>
        ))}
      </>
    );
  }
}
```

Here's the same component using a functional component and hooks ...

```javascript
const Category = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch('api/category')
      .then((res) => res.json())
      .then((json) => {
        setdata(json);
      });
  }, [data]);

  return (
    <>
      <h1>Data</h1>
      {data.map((item) => (
        <div key={ item.id }>{ item.title }</div>
      ))}
    </>
  );
};
```

**[Back to top](#table-of-contents)**
