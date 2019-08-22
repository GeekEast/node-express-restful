## Restful
### What
- REST: Representational State Transfer
- It's a `convention` for building these HTTP serivces.

### HTTP
<table>
    <tr>
        <td bgcolor=blue>
            <center>
                <font color=orange size=5>
                    Http://vidly.com/api/customers/1
                </font>
            </center>
        </td>
    </tr>
</table>

- `Http`: Protocol
- `vidly.com`: Domain
- `api`: Path
- `customers`: **Resource**
- `1`: Resource **Unique** Identifier

### HTTP Methods
- GET: retrive resources
- POST: upload resources
- PUT: update global resources
- PATCH: update local resources
- DELETE: delete resources
```javascript
GET /api/customers
GET /api/customers/1
PUT /api/customers/1
DELETE /api/customers/1
POST /api/customers
```