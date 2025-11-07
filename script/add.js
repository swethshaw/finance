
        var grandAmount = 0;
        var tax = 0;
        var discount = 0;
        var t = 0;
        var d = 0;
        var now = new Date();
        var datetime = now.toLocaleDateString();
        document.getElementById('date').value = datetime;
        function removeParentDiv(button) {
            var parentDiv = button.parentNode;
            var granddiv = parentDiv.parentNode;
            granddiv.parentNode.removeChild(granddiv);
            updateTotals();
        }
        $(document).ready(function () {
            $("#addnew").click(function () {
                var newRow = `
            <div class="row" id="addelement">
                <div class="col-7" id="item">
                    <input type="text" placeholder="Enter the name of the item">
                </div>
                <div class="col-1" id="item">
                    <input type="number" placeholder="0" class="qty" id="price">
                </div>
                <div class="col-2" id="item">
                    <i class="fa fa-inr" id="ru"></i><input type="number" placeholder="0.0" class="rate" id="price">
                </div>
                <div class="col-1" id="item">
                    <button type="button" onclick="removeParentDiv(this)" id="delete"><i class="fa fa-trash"
                            id="dustbin" aria-hidden="true"></i></button>
                </div>
            </div>`
                $("#item-area").append(newRow);
                updateTotals();
            });
            $("#addelement").on("input", ".qty, .rate", function () {
                updateTotals();
            });
        });
        function updateTotals() {
            var totalQty = 0;
            var totalRate = 0;
            var totalAmount = 0;
            $(".row").each(function () {
                var qty = parseInt($(this).find(".qty").val()) || 0;
                var rate = parseFloat($(this).find(".rate").val()) || 0;
                var amount = qty * rate;

                totalQty += qty;
                totalRate += rate;
                totalAmount += amount;
            });
            $(".discount").on("input", function () {
                d = parseInt($(".discount").val()) || 0;
            });
            $(".tax").on("input", function () {
                t = parseInt($(".tax").val()) || 0;
            });
            function printall() {
                tax = (totalAmount * t) / 100;
                discount = (totalAmount * d) / 100;
                grandAmount = totalAmount + tax - discount;
                var tQty = totalQty.toString();
                var tRate = totalRate.toString();
                var tAmount = totalAmount.toString();
                var ta = tax.toString();
                var dit = discount.toString();
                var taxe = t.toString();
                var disc = d.toString();
                var g = grandAmount.toString();
                $(".taxo").text(taxe);
                $(".diso").text(disc.toString());
                $(".taxout").text(ta);
                $(".disout").text(dit);
                $(".subout").text(tAmount);
                $(".grandout").val(g);
            }
            $("#cal").mouseenter(function () {
                updateTotals();
            });
            $("#cal").on("click", function () {
                updateTotals();
                printall();
            });
        }
        function printInvoice() {
            window.print();
        }
        $(document).ready(function () {
            $("#print-btn").click(function () {
                printInvoice();
            });
            function saveInvoice() {
                document.getElementById('date').disabled=false;
                document.getElementById('gfont').disabled=false;
                alert("Invoice saved successfully!");
            }
            $("#save-btn").click(function () {
                saveInvoice();
            });
        });
