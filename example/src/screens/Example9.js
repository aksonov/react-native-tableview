import React from 'react'
import { ScrollView } from 'react-native'
import TableView from 'react-native-tableview'

const { Section, Item } = TableView
const headerHeight = 26;
const itemHeight = 44;

class Example9 extends React.Component {
  state = {
    scrollEnabled: true,
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
      { id: 5, name: 'Item 5' },
      { id: 6, name: 'Item 6' },
    ],
  }

  render() {
    const { scrollEnabled, items } = this.state;

    return(
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={{ flex: 1 }}
      >
        <TableView
          editing
          scrollEnabled={false}
          onReorderingStart={() => {
              this.setState({ scrollEnabled: false });
          }}
          onReorderingEnd={() => {
              this.setState({ scrollEnabled: true });
          }}
          onReorderingCancel={() => {
              this.setState({ scrollEnabled: true });
          }}
          style={{
              // You should explicitly set height for TableView
              // default height of header in iOS is 26, row height is 44
              height: headerHeight + (items.count * itemHeight),
          }}
        >
          <Section canMove>
            {items.map(obj => (
                <Item
                  key={obj.id}
                  label={obj.name}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

export default Example9
