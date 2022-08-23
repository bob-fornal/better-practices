# React Better Practices

## Table of Contents

1. [Functional Components and Classes](#functional-components-and-classes)

## Functional Components and Classes

### Use Functional Components and Hooks
###### [Better Practice [RT001](#better-practice-rt001)]

  - Use functional components and hooks.

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
